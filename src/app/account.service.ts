import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()

export class AccountService {
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
    ];

    constructor(private loggingService: LoggingService) {}

    statusUpdated = new EventEmitter<string>();

    addAcoount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
    }
    updateAccount(id: number, status: string) {
        this.accounts[id].status = status;
    }

}