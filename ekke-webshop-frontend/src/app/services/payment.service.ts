import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private ethereum: any;
  private tokenContractAddress = '0x94463fe3011de32F140cc684fBD0cAA8BB5a4C1a';
  private paymentAddress = '0x619d3fbC6880F2fCEFD8715b27845513bcCB5076';
  // todo delete
  private buyerAddress = '0x47987278BEf8B52E0cf536B6FeFACaCF2162ebF4';
  //
  private accounts: string[] = [];

  constructor() {
    const { ethereum } = <any>window;
    this.ethereum = ethereum;
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
    await this.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.buyerAddress, // The user's active address.
            to: this.tokenContractAddress, // Required except during contract publications.
            data: this.getDataFieldValue(
              this.paymentAddress,
              String(price * 10)
            ),
          },
        ],
      })
      .then((txHash: unknown) => console.log(txHash))
      .catch((error: unknown) => console.error(error));
  }

  getDataFieldValue(tokenRecipientAddress: string, tokenAmount: string) {
    const web3 = new Web3();

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

    return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
      tokenRecipientAddress,
      tokenAmount,
    ]);
  }
}
