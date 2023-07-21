import { NETWORK_PROVIDER, NETWORK_SLUG } from '@dexkit/core/constants/networks';
import { Asset } from '@dexkit/core/types';
import { getAssetDexKitApi } from '@dexkit/ui/constants/api';
import { getAssetData, getAssetMetadata } from '@dexkit/ui/modules/nft/services';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let asset: Asset | undefined;
  const { chainId, contractAddress, tokenId } = req.query;
  try {
    const provider = NETWORK_PROVIDER(parseInt(chainId as string));
    asset = await getAssetData(
      provider,
      contractAddress as string,
      tokenId as string
    );
  } catch (e) {
    console.log(e);
  }

  if (!asset) {
    return res.status(404).end();
  }
  try {
    const assetAPI = await getAssetDexKitApi({ networkId: NETWORK_SLUG(parseInt(chainId as string)) as string, contractAddress: contractAddress as string, tokenId: tokenId as string })
    if (assetAPI) {
      if (assetAPI.rawData) {
        const metadata = JSON.parse(assetAPI.rawData);
        return res.json({
          ...asset,
          metadata: {
            ...metadata,
            image: assetAPI.imageUrl,
          }
        })
      }
    }
  } catch (e) {
    console.log(e);
    console.log('failed fetching from api')
  }

  const metadata = await getAssetMetadata(asset?.tokenURI, {
    image: '',
    name: `${asset.collectionName} #${asset.id}`,
  });

  return res.json({ ...asset, metadata });

}
