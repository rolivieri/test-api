/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// tslint:disable-next-line
Promise = require('bluebird');

describe('controllers - myAssetExists', () => {

  // Dummy util for sendResponse call
  const DummyUtil = {
    // tslint:disable-next-line: no-empty
    sendResponse: (res, jsonRes) => { },
  };

  // Create mocks for request & response objects
  const jsonRes = {
    result: true,
    statusCode: 200,
    success: true
  };

  const errorJsonRes = {
    message: "Error occurred!",
    statusCode: 500,
    success: false
  };

  const req = {
    params: {
      assetId: "key1"
    }
  };

  // tslint:disable-next-line: prefer-const
  let res: any;
  let spy: jest.SpyInstance<void, [any, any]>;
  jest.mock('../../server/helpers/util', () => (DummyUtil));

  // Load controller to test
  const myAssetExistsCtrl = require('../../server/controllers/myAssetExists');

  beforeEach(() => {
    spy = jest.spyOn(DummyUtil, 'sendResponse');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('should successfully invoke transaction getMyAsset', async () => {
    const dummyCCInvocation = jest.fn(() => Promise.resolve("true"));
    res = { locals: { defaultchannel: { mycontract: { evaluateTransaction: dummyCCInvocation } } } };

    await myAssetExistsCtrl.default(req, res);
    expect(DummyUtil.sendResponse).toBeCalledWith(res, jsonRes);
  });

  test('should catch getMyAsset error and return error', async () => {
    const dummyCCInvocation = jest.fn(() => Promise.reject(new Error(errorJsonRes.message)));
    res = { locals: { defaultchannel: { mycontract: { evaluateTransaction: dummyCCInvocation } } } };

    await myAssetExistsCtrl.default(req, res);
    expect(DummyUtil.sendResponse).toBeCalledWith(res, errorJsonRes);
  });

});
