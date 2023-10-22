import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private ethereum: any;
  private web3: any;
  private tokenContractAddress = '0x94463fe3011de32f140cc684fbd0caa8bb5a4c1a';
  private mainAddress = '0x619d3fbC6880F2fCEFD8715b27845513bcCB5076';

  public accounts: string[] = [];
  public paymentAddress = signal<string>('');
  public transactionMined = new BehaviorSubject<any>(null);

  constructor() {
    const { ethereum } = <any>window;
    this.ethereum = ethereum;
    this.web3 = new Web3(ethereum);
  }

  async connect() {
    try {
      this.accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } catch (e) {
      throw new Error('no ethereum found');
    }
  }

  async purchase(price: number) {
    try {
      const txHash = await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.paymentAddress(),
            to: this.tokenContractAddress,
            data: this.getDataFieldValue(this.mainAddress, String(price * 10)),
          },
        ],
      });

      const transaction = await this.web3.eth.getTransaction(txHash);
      if (!this.validateTransaction(transaction, price)) {
        return false;
      }
      this.startChekingIfTransactionIsMined(txHash);
      return true;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  getDataFieldValue(tokenRecipientAddress: string, tokenAmount: string) {
    const TRANSFER_FUNCTION_ABI = {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    };

    return this.web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
      tokenRecipientAddress,
      tokenAmount,
    ]);
  }

  validateTransaction(transaction: any, price: number) {
    const erc20TransferABI = [
      {
        type: 'address',
        name: 'receiver',
      },
      {
        type: 'uint256',
        name: 'amount',
      },
    ];
    const parameters = this.web3.eth.abi.decodeParameters(
      erc20TransferABI,
      transaction.input.slice(10)
    );
    const convertedPrice = price * 10;

    if (
      transaction.from === this.paymentAddress() &&
      transaction.to === this.tokenContractAddress &&
      Number(parameters.amount) === convertedPrice
    ) {
      return true;
    }
    return false;
  }

  async startChekingIfTransactionIsMined(txHash: string) {
    const interval = setInterval(() => {
      this.web3.eth
        .getTransactionReceipt(txHash)
        .then((receipt: any) => {
          this.transactionMined.next(receipt);
          clearInterval(interval);
        })
        .catch(() => console.info('Transaction is under mining.'));
    }, 5000);
  }
}
