import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class Subscribing implements OnDestroy {
    protected Unsubscribe: Subject<any> = new Subject();
    public ngOnDestroy() {
        this.Unsubscribe.next();
        this.Unsubscribe.complete();
    }
}
