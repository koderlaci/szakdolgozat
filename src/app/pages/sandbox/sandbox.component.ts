import { Component } from '@angular/core';
import Web3 from 'web3';
// import { encodeFunctionCall } from 'web3-eth-abi';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  accounts: string[] = [];
  ethereum;
  tokenContractAddress: string = '0x94463fe3011de32F140cc684fBD0cAA8BB5a4C1a';
  paymentAddress: string = '0x47987278BEf8B52E0cf536B6FeFACaCF2162ebF4';
  price: string = '1';

  constructor() {
    const { ethereum } = <any>window;
    this.ethereum = ethereum;
    this.getAccounts();
  }

  async connect() {
    try {
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } catch (e) {
      throw new Error('no ethereum found');
    }
  }

  async purchase() {
    await this.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.accounts[1], // The user's active address.
            to: this.tokenContractAddress, // Required except during contract publications.
            data: this.getDataFieldValue(this.accounts[0], this.price),
          },
        ],
      })
      .then((txHash: unknown) => console.log(txHash))
      .catch((error: unknown) => console.error(error));
  }

  async getAccounts() {
    this.accounts = await this.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(this.accounts);
  }

  getDataFieldValue(tokenRecipientAddress: string, tokenAmount: string) {
    // const web3 = new Web3();

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

    // return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
    //   tokenRecipientAddress,
    //   tokenAmount,
    // ]);

    // return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
    //   tokenRecipientAddress,
    //   tokenAmount,
    // ]);
  }
}
