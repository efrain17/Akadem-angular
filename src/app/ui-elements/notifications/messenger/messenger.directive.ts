import { Directive, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
declare var Messenger: any;

@Directive ({
  selector: '[messenger-demos]'
})

export class MessengerDemos {
  $el: any;

  initializationCode(): void {
    /* tslint:disable */
    (function(): void {
      let $, flatMessage, spinnerTemplate, LocationSelector,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent): any { for (let key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; } } function ctor(): void { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

      LocationSelector = function($el) {
        this.$el = $el;
        this.$el.on('click', '.bit', this.handleClick.bind(this));
      };

      LocationSelector.prototype.className = 'location-selector';

      LocationSelector.prototype.handleClick = function(e) {
        var $bit;
        $bit = jQuery(e.target);
        return this.$el.trigger('update', [$bit.attr('data-position').split(' ')]);
      };

      jQuery.fn.locationSelector = function() {
        var loc;
        loc = new LocationSelector(this);
        jQuery(this).addClass(loc.className);
        return jQuery(this);
      };

      spinnerTemplate = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';
      /* tslint:enable */
      flatMessage = (function(_super): any {

        __extends(flatMessage, _super);

        function flatMessage(): any {
          /* tslint:disable */
          return flatMessage['__super__'].constructor.apply(this, arguments);
          /* tslint:enable */
        }

        flatMessage.prototype.template = function(opts): any {
          let $message;
          /* tslint:disable */
          $message = flatMessage['__super__'].template.apply(this, arguments);
          /* tslint:enable */
          $message.append(jQuery(spinnerTemplate));
          return $message;
        };

        return flatMessage;
        /* tslint:disable */
      })(window['Messenger'].Message);

      window['Messenger'].themes.air = {
        Message: flatMessage
      };
      /* tslint:enable */
    }).call(window);
  }

  render(): void {
    this.initializationCode();
    let theme = 'air';

    jQuery.globalMessenger({ theme: theme });
    Messenger.options = { theme: theme  };

    let loc = ['top', 'right'];

    let $lsel = jQuery('.location-selector');

    let update = function(): void {
      let classes = 'messenger-fixed';

      for (let i = 0; i < loc.length; i++) { classes += ' messenger-on-' + loc[i]; }

      jQuery.globalMessenger({ extraClasses: classes, theme: theme  });
      Messenger.options = { extraClasses: classes, theme: theme };
    };

    update();

    $lsel.locationSelector()
      .on('update', (e, pos) => {
        loc = pos;

        update();
      });

    
  }

  public mensajeSucessFull(): void {
    Messenger().post({
      message: 'Operación realiazada con exito!',
      type: 'success',
      showCloseButton: true
    });
  }

  public mensajeError(): void {
    Messenger().post({
      message: 'Ocurrio un error en la operación!',
      type: 'error',
      showCloseButton: true
    });
  }

  ngOnInit(): void {
    this.render();
  }
}
