import { Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy, Inject, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-widget-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss', './dialog.component.user.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})

export class DialogComponent implements  OnDestroy {
    @Input() closable = true;
    @Input() dimensionsClass: string;
    @Input() visible: boolean;
    @Input() closeDialogOnDocumentClick?: boolean = true;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnChanges(changes: SimpleChange) {
        if (changes['visible']&&changes['visible'].currentValue) {
            this.document.body.style.overflow = 'hidden'
        } else {
            this.document.body.style.overflow = 'auto'
        }
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    closeOnDocumentClick() {
        if(this.closeDialogOnDocumentClick) {
            this.close();
        }
    }

    ngOnDestroy() {
        this.document.body.style.overflow = 'auto'
    }
}