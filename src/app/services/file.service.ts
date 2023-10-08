import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { Subject } from 'rxjs';


/**
 * @description: Size interface
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * @description: Strapi file interface.
 */
export interface StrapiUniFile {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: null;
      provider: string;
      provider_metadata: null;
      createdAt: string;
      updatedAt: string;
    };
  }
};


@Injectable({
  providedIn: 'root'
})
export class FileService {

  /**
   * @description: 
   */
  public stream: Subject<any> = new Subject<any>();

  /**
   * @description: 
   */
  public upload_file_type_mime = {
    image: [
      'image/png',
      'image/gif',
      'image/jpeg',
      'image/webp'
    ],
    video: [
      'video/x-matroska',
      'video/x-ms-wmv',
      'video/x-ms-asf',
      'video/x-msvideo',
      'video/quicktime',
      'video/webm',
      'audio/mpeg',
      'video/mp4',
    ],
  };

  /**
   * @description: 
   */
  public bad_file_type_mime_message = {
    image: `Incorrect format, try again with .jpg, .png, .gif only`,
    video: 'Incorrect format, try again with .avi or .mp4 .'
  }

  /**
   * @description: 
   */
  SERVER_URL: string = "http://127.0.0.1:1337";

  /*
  * @description:
  */
  constructor(
    private HttpClient: HttpClient,
  ) {

  }

  /*
  * @description:
  */
  public addFiles(files: any) {

  }

  /*
  * @description:
  */
  private getServerUrl(path_url: any = undefined): string {
      if (path_url !== undefined) {
        return '' + path_url;
      }
      return 'http://127.0.0.1:1337/api/upload';
  }

  /*
  * @description:
  */
  public upload(formData: any, path_url: any=undefined) {
    return this.HttpClient.post<any>(this.getServerUrl(path_url), formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /*
  * @description:
  */
  public cancel(file_upload_request: any) {
    file_upload_request.unsubscribe();
  }

  /*
  * @description:
  */
  public getExtension(src: string): string {
    const spl_video = src.split(`.`);
    const ext = spl_video[spl_video.length -1];
    return ext.toLowerCase();
  }


  /*
  * @description:
  */
  public isVideoFileSrc(src: string): boolean {
    const ext = this.getExtension(src);
    const extList = ['avi', 'mp4', 'webm', 'mov'];

    if (extList.indexOf(ext) === -1) {
      return false;
    }
    
    return true;
  }

  /*
  * @description:
  */
  public isImageFileSrc(src: string): boolean {
    const ext = this.getExtension(src);
    const extList = ['png', 'gif', 'jpeg', 'jpg', 'webp'];
    if (extList.indexOf(ext) === -1) {
      return false;
    }
    return true;
  }

  /*
  * @description:
  */
  public formatCropCoordinate(cropThis: any, file_path: string): any {
    const cropperPosition: any = cropThis.cropperPosition;
    const imagePosition: any = cropThis.imagePosition;

    delete cropThis.base64;
    delete cropThis.cropperPosition;
    delete cropThis.imagePosition;

    for (const key of Object.keys(cropperPosition)) {
        cropThis['cropper_position_' + key] = parseInt(cropperPosition[key]);
    }

    for (const key of Object.keys(imagePosition)) {
        cropThis['image_position_' + key] = parseInt(imagePosition[key]);
    }

    cropThis.file_path = file_path;
    return cropThis;
  }

  /**
   * @description: Get file from Strapi.
   */
  public getSrc(file: StrapiUniFile): string {
    if (file.data === null) { return ''; }
    return file.data.attributes.url;
  }

  /**
   * @description: Get file from Strapi.
   */
  public getFileSize(file: StrapiUniFile): Size {
    if (file.data === null) { 
      return {
        width: 0,
        height: 0,
      }; 
    }
    return {
      width: file.data.attributes.width,
      height: file.data.attributes.height,
    };
  }
}
