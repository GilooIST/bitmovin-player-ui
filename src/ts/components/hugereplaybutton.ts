import {ButtonConfig, Button} from './button';
import {DOM} from '../dom';
import {UIInstanceManager} from '../uimanager';
import {ToggleButtonConfig} from './togglebutton';
import {PlaybackToggleButton} from './playbacktogglebutton';
import PlayerEvent = bitmovin.PlayerAPI.PlayerEvent;

/**
 * A button to play/replay a video.
 */
export class HugeReplayButton extends PlaybackToggleButton {

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-hugereplaybutton',
      text: 'Replay',
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.onClick.subscribe(() => {
      player.seek(0);
    });

    // Hide button while initializing a Cast session
    let castInitializationHandler = (event: PlayerEvent) => {
      if (event.type === player.EVENT.ON_CAST_START) {
        // Hide button when session is being initialized
        this.hide();
      } else {
        // Show button when session is established or initialization was aborted
        this.show();
      }
    };
    player.addEventHandler(player.EVENT.ON_CAST_START, castInitializationHandler);
    player.addEventHandler(player.EVENT.ON_CAST_STARTED, castInitializationHandler);
    player.addEventHandler(player.EVENT.ON_CAST_STOPPED, castInitializationHandler);
  }

  protected toDomElement(): DOM {
    let buttonElement = super.toDomElement();

    // Add child that contains the play button image
    // Setting the image directly on the button does not work together with scaling animations, because the button
    // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
    // to the size if the image, it can scale inside the player without overshooting.
    buttonElement.append(new DOM('div', {
      'class': this.prefixCss('image'),
    }));

    return buttonElement;
  }
}