import type { Draft } from 'types';

export default function handler(req: import('next').NextApiRequest, res: import('next').NextApiResponse) {
  const { userId } = req.headers;

  const example: Draft = {
    id: "stub-draft-id",
    userId: String(userId || ""),
    tipId: "stub-tip-id",
    content: "Example draft tip content.",
    createdAt: new Date().toISOString()
  }

  res.status(200).json([example]);
}
