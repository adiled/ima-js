/**
 * @license
 * SKALE ima-js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file DepositBoxERC1155.ts
 * @copyright SKALE Labs 2022-Present
 */

import { providers, BigNumber, BigNumberish } from 'ethers';

import { DepositBox } from './DepositBox';
import * as transactions from '../../transactions';
import TxOpts from '../../TxOpts';
import InvalidArgsException from '../../exceptions/InvalidArgsException';


export class DepositBoxERC1155 extends DepositBox {

    // todo: add approve single ERC1155!

    async approveAll(tokenName: string, opts: TxOpts): Promise<providers.TransactionResponse> {
        const tokenContract = this.tokens[tokenName];
        const txData = await tokenContract.populateTransaction.setApprovalForAll(
            this.address,
            true
        );
        return await transactions.send(
            this.provider,
            txData,
            opts,
            this.txName('setApprovalForAll')
        );
    }

    async deposit(
        chainName: string,
        tokenName: string,
        tokenIds: number | number[],
        amounts: BigNumberish | BigNumberish[],
        opts: TxOpts
    ): Promise<providers.TransactionResponse> {
        const tokenContract = this.tokens[tokenName];
        const tokenContractAddress = tokenContract.address;

        let txData: any;

        if (typeof tokenIds === 'number' && !(amounts instanceof Array)) {
            txData = await this.contract.populateTransaction.depositERC1155(
                chainName,
                tokenContractAddress,
                tokenIds,
                amounts
            );
        } else if (tokenIds instanceof Array && amounts instanceof Array) {
            txData = await this.contract.populateTransaction.depositERC1155Batch(
                chainName,
                tokenContractAddress,
                tokenIds,
                amounts
            );
        } else {
            throw new InvalidArgsException(
                'tokenIds and amounts should both be arrays of single objects');
        }
        return await transactions.send(this.provider, txData, opts, this.txName('depositERC1155'));
    }

    async getTokenMappingsLength(chainName: string): Promise<BigNumber> {
        return await this.contract.getSchainToAllERC1155Length(
            chainName);
    }

    async getTokenMappings(
        chainName: string,
        from: BigNumberish,
        to: BigNumberish
    ): Promise<string[]> {
        return await this.contract.getSchainToAllERC1155(
            chainName,
            from,
            to
        );
    }

    async isTokenAdded(chainName: string, erc1155OnMainnet: string) {
        return await this.contract.getSchainToERC1155(
            chainName, erc1155OnMainnet);
    }

    async addTokenByOwner(
        chainName: string,
        erc1155OnMainnet: string,
        opts: TxOpts
    ): Promise<providers.TransactionResponse> {
        const txData = await this.contract.populateTransaction.addERC1155TokenByOwner(
            chainName,
            erc1155OnMainnet
        );
        return await transactions.send(
            this.provider,
            txData,
            opts,
            this.txName('addERC1155TokenByOwner')
        );
    }

}
