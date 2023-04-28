import { normalize, schema } from 'normalizr';

export default (data) => {
  return normalize(data, schema);
}
