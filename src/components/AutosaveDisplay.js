import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

export const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.NOT_SAVED:
      display = (
        <div>
          <p>Saving</p>
          <CachedIcon />
        </div>
      );
      break;
    case SavingState.SAVING:
      display = (
        <div>
          <p>Saving</p>
          <CachedIcon />
        </div>
      );
      break;
    case SavingState.SAVED:
      display = (
        <div>
          <p>Saved</p>
          <CheckCircleOutlineIcon />
        </div>
      );
      break;
    default:
      display = <br />;
  }
  return <div className="auto-save-display">{display}</div>;
};
