import { normalize, schema } from 'normalizr';

 const normalizeData = (data) => normalize(data, schema);

export default normalizeData;
