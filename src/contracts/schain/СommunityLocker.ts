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
 * @file СommunityLocker.ts
 * @copyright SKALE Labs 2022-Present
 */

import { providers } from 'ethers';

import { BaseContract } from '../BaseContract';
import TxOpts from '../../TxOpts';
import * as transactions from '../../transactions';


export class СommunityLocker extends BaseContract {

    async setTimeLimitPerMessage(
        limit: number,
        opts: TxOpts
    ): Promise<providers.TransactionResponse> {
        const txData = await this.contract.populateTransaction.setTimeLimitPerMessage(limit);
        return await transactions.send(
            this.provider,
            txData,
            opts,
            this.txName('setTimeLimitPerMessage')
        );
    }

    async CONSTANT_SETTER_ROLE(): Promise<string> {
        return await this.contract.CONSTANT_SETTER_ROLE();
    }

    async grantRole(
        role: any,
        address: string,
        opts: TxOpts
    ): Promise<providers.TransactionResponse> {
        const txData = await this.contract.populateTransaction.grantRole(role, address);
        return await transactions.send(this.provider, txData, opts, this.txName('grantRole'));
    }
}
