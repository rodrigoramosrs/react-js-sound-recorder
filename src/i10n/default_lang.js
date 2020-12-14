import ui_translation from "./translations/ui_translation";
import engine_translation from "./translations/engine_translation";
import fx_pg_eq_translation from "./translations/fx_pg_eq_translation";
import modal_translation from "./translations/modal_translation";
import recorder_translation from "./translations/recorder_translation";
import ui_fx_translation from "./translations/ui_fx_translation";

const default_language = {
  ...ui_translation,
  ...engine_translation,
  ...fx_pg_eq_translation,
  ...modal_translation,
  ...recorder_translation,
  ...ui_fx_translation,
};

export default default_language;
