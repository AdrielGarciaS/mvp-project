import { NextApiHandler } from 'next';
import { api } from 'services/api';

const NextHandler: NextApiHandler = async (req, res) => {
  const response = await api.get('users');

  res.status(200).json(response.data.data);
};

export default NextHandler;
