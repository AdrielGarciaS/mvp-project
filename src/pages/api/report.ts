import { NextApiHandler } from 'next';
import { mvpApi } from 'services/api';

const NextHandler: NextApiHandler = async (req, res) => {
  const response = await mvpApi.post('report', req.body);

  res.status(200).json(response.data.data);
};

export default NextHandler;
