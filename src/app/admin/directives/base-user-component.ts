import { Directive } from '@angular/core';
import { BaseComponent } from '@shared/directives/base-component';
import { Base } from '@core/models/base.model';
import { User } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';

@Directive()
export abstract class BaseUserComponent<
  T extends Base
> extends BaseComponent<T> {
  constructor(public userService: UserService) {
    super();
  }

  override process(value: any) {
    const user: User = {
      id: value['id'] as number,
    };
    if (value['ids'].user) {
      user.id = value['ids'].user;
    }
    if (value['password']) {
      user['password'] = value['password'];
    }
    if(!user['password']) {
      user['password'] = "Test@123";
    }
    delete value['ids'];
    delete value['password'];
    value.user = user;

    if(user.id) {
      this.userService.getIdByUsername(user.id).subscribe({
        next: (id) => {
          super.process(value);
        },
        error: () => {
          super.process(value);
        },
      });
    } else{
      super.process(value);
    }
    
  }
}
