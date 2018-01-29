import {SubtitleSettingSelectBox} from './subtitlesettingselectbox';
import {UIInstanceManager} from '../../uimanager';

/**
 * A select box providing a selection of different font colors.
 */
export class FontSizeSelectBox extends SubtitleSettingSelectBox {

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);
    
    // The corresponding font-size setting, we need to set value in css
    this.addItem('170', '預設');
    // this.addItem('50', '50%');
    this.addItem('120', '較小');
    // this.addItem('100', '100%');
    this.addItem('250', '較大');
    // this.addItem('200', '200%');
    // this.addItem('300', '300%');
    // this.addItem('400', '400%');

    this.settingsManager.fontSize.onChanged.subscribe((sender, property) => {
      if (property.isSet()) {
        this.toggleOverlayClass('fontsize-' + property.value);
      } else {
        this.toggleOverlayClass(null);
      }

      // Select the item in case the property was set from outside
      this.selectItem(property.value);
    });

    this.onItemSelected.subscribe((sender, key: string) => {
      this.settingsManager.fontSize.value = key;
    });

    // Load initial value
    if (this.settingsManager.fontSize.isSet()) {
      this.selectItem(this.settingsManager.fontSize.value);
    }
  }
}
