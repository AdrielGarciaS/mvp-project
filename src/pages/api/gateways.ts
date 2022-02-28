import { NextApiHandler } from 'next';
import { mvpApi } from 'services/api';

const NextHandler: NextApiHandler = async (req, res) => {
  const response = await mvpApi.get('gateways');

  res.status(200).json(response.data.data);
};

export default NextHandler;
