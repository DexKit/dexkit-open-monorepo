import { NETWORK_PROVIDER } from '@dexkit/core/constants/networks';
import { Collection } from '@dexkit/ui/modules/nft/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getCollectionData } from '@dexkit/ui/modules/nft/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chainId, contractAddress } = req.query;

  const provider = NETWORK_PROVIDER(parseInt(chainId as string));

  const collection: Collection | undefined = await getCollectionData(
    provider,
    contractAddress as string,
    parseInt(chainId as string)
  );

  if (!collection) {
    return res.status(404).end();
  }

  return res.json(collection);
}
