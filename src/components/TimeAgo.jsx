import { formatDateSafe } from "../utils/formatDate";

const TimeAgo = ({ date }) => (
  <>
    <span className="inline md:hidden">
      {formatDateSafe(date, { short: true })}
    </span>
    <span className="hidden md:inline">{formatDateSafe(date)}</span>
  </>
);

export default TimeAgo;
