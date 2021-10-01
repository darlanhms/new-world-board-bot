import Handler from 'shared/logic/Handler';
import ActiveHandler from './start';

const handlers: Array<Handler> = [new ActiveHandler()];

export default handlers;
