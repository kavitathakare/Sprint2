import { Directive, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Base } from '@core/models/base.model';
import { Page } from '@core/models/page.model';
import { EntityAttribute } from '@core/models/entity-attribute.model';
import { RestService } from '@core/services/rest.service';
import { DialogFormComponent } from '@shared/components/dialog-form/dialog-form.component';
import { DialogDeleteComponent } from '@shared/components/dialog-delete/dialog-delete.component';
import { TableComponent } from '@shared/components/table/table.component';
import { TableData } from '@core/models/table-data.model';
import { environment } from 'environments/environment';

@Directive()
export abstract class BaseComponent<T extends Base> {
  abstract title: string;
  abstract name: string;
  abstract attributes: EntityAttribute[];

  service: RestService<T>;
  dialog: MatDialog;

  data: any;
  selected: T;
  tableData: TableData;

  @ViewChild(TableComponent) table: TableComponent<T>;

  findAttribute(key: string): EntityAttribute | undefined {
    return this.attributes.find((attribute) => attribute.key === key);
  }

  getPage(data?: any, baseUrl?: string) {
    data !== undefined ? (this.tableData = data) : (data = this.tableData);

    this.service.getPage(data?.request, baseUrl).subscribe((data:any) => {
      let resData = {
        content: data,
        totalElements: data.length,
        pageIndex: 1
      };
      this.data = resData;
    });
  }

  getOptions(attributeKey: string, service: RestService<any>) {
    const attribute = this.findAttribute(attributeKey);
    if (!attribute) {
      return;
    }

    service.getAll().subscribe((arr) => {
      const options: any = {};
      arr.forEach((el) => {
        el['name'] = el.title;
        const option: any = {};
        option['data'] = el;
        if (attribute.display) {
          option['display'] = attribute.display(el);
        }
        options[el.id] = option;
      });
      attribute.options = options;
    });
  }

  create() {
    this.openForm();
  }

  edit(value: T) {
    const newValue = { ...value };
    this.format(newValue);
    this.selected = newValue;
    this.openForm(this.selected);
  }

  format(value: any) {
    this.attributes
      .filter((attribute) => attribute.type === 'select')
      .forEach((attribute) => {
        if (!value[attribute.key]) {
          return;
        }

        const formattedValue: any = {};
        formattedValue['data'] = value[attribute.key];
        if (attribute.display) {
          formattedValue['display'] = attribute.display(value[attribute.key]);
        }
        value[attribute.key] = formattedValue;
      });
  }

  openForm(value?: T) {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: {
        name: this.name,
        attributes: this.attributes,
        value: value,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.process(result);
      }
    });
  }

  process(value: T) {
    const baseUr = environment.baseUrl;
    delete value['ids'];
    value.id
      ? this.service.update(value.id, value, value['type']).subscribe({
          next: () => {
            this.getPage(null, this.getUrl(baseUr, value));
          },
          error: () => {
            window.alert('Something went wrong! Please try again');
          },
        })
      : this.service.create(value, value['type']).subscribe({
          next: () => {
            this.getPage(null, this.getUrl(baseUr, value));
          },
          error: () => {
            window.alert('Something went wrong! Please try again');
          },
        });
  }

  getUrl = (baseUr: string, value?: T) => {
    if (value && value['type'] == 'student') {
      baseUr = baseUr + '/students';
    } else if (value && value['type'] == 'teacher') {
      baseUr = baseUr + '/students';
    } else {
      baseUr = baseUr + '/course';
    }
    return baseUr;
  }

  delete(ids: number[]) {
    if (!ids.length) {
      window.alert('No rows are selected!');
      return;
    }

    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const baseUr = environment.baseUrl;
      if (result) {
        let isTeacherRoute = location.href.split('/').some(e => e.includes("teachers"));
        let isStudRoute = location.href.split('/').some(e => e.includes("students"));
        let type = 'teacher';
        if(!isTeacherRoute && isStudRoute) {
          type = 'student';
        } else {
          type = 'course';
        }
        this.service.deleteMultiple(ids, type).subscribe(() => {
          this.getPage(null, this.getUrl(baseUr));
          this.table.clearSelection();
        });
      }
    });
  }
}
