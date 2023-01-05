import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { saveAs } from 'file-saver';

// Se instala una liberia llamada file-saver para manegar la
// descarga de archivos. npm i file-saver y npm install @types/file-saver --save-dev

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }



  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob' })
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name)
      }),
      map(() => true)
    );
  }


}
