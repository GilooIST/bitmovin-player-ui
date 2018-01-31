import {SubtitleSettingSelectBox} from './subtitlesettingselectbox';
import {UIInstanceManager} from '../../uimanager';

/**
 * A select box providing a selection of different font colors.
 */
export class FontSizeSelectBox extends SubtitleSettingSelectBox {

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);
    
    let fontValue = [
      {
        value: '170',
        name: '預設'
      },
      {
        value: '120',
        name: '較小'
      },
      {
        value: '250',
        name: '較大'
      }
    ]

    var vm = this;
    fontValue.forEach((d)=>{
      vm.addItem(d.value,d.name);
    })
    // The corresponding font-size setting, we need to set value in css
    // this.addItem('170', '預設');
    // this.addItem('50', '50%');
    // this.addItem('120', '較小');
    // this.addItem('100', '100%');
    // this.addItem('250', '較大');
    // this.addItem('200', '200%');
    // this.addItem('300', '300%');
    // this.addItem('400', '400%');

    this.settingsManager.fontSize.onChanged.subscribe((sender, property) => {
      if (property.isSet()) {
        this.toggleOverlayClass('fontsize-' + property.value);
        this.selectItem(property.value);
      } else {
        this.toggleOverlayClass('fontsize-' + fontValue[0].value );
        this.selectItem(fontValue[0].value);
      }

      // Select the item in case the property was set from outside
    });

    this.onItemSelected.subscribe((sender, key: string) => {
      this.settingsManager.fontSize.value = key;
    });

    // Load initial value
    // If not loaded, take the default value
    if (this.settingsManager.fontSize.isSet()) {
      this.selectItem(this.settingsManager.fontSize.value);
    }
    else {
      this.settingsManager.fontSize.value = fontValue[0].value;
      this.selectItem(fontValue[0].value);
    }
  }
}
