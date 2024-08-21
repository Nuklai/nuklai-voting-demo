import { auth } from '@nuklai/hyperchain-sdk';
import { NuklaiSDK } from '@nuklai/nuklai-sdk';

const sdk = new NuklaiSDK({
  baseApiUrl: 'https://api-devnet.nuklaivm-dev.net:9650',
  blockchainId: 'JopL8T69GBW1orW4ZkJ1TBRzF97KXaY8e64atDA1v2M12SNqm',
});

export async function getBalanceAndAddress(privateKey) {
  const authFactory = auth.getAuthFactory('ed25519', privateKey);
  const encodedMessage = new TextEncoder().encode('ED25519');
  const ed25519_Auth = await authFactory.sign(encodedMessage);
  const nuklaiAddress = ed25519_Auth.address().toString();
  const balance = await sdk.rpcServiceNuklai.getBalance({
    address: nuklaiAddress,
    asset: 'nai',
  });

  return { nuklaiAddress, balance: balance.amount };
}