import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { photoInterface } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor( private api: ApiService, private router: Router) { }

  @ViewChildren('lastElementRef', { read: ElementRef })
  lastElementRef!: QueryList<ElementRef>;

  photos: photoInterface[] = []
  albumID: 1|2|3|4|5|6|7|8|9|10 = 1
  observer: any;

  ngOnInit(): void {
    if (localStorage.getItem("email") === null) {
      this.router.navigate(['/login']);
    }
    this.fetch()
    this.intersectionObserver()
    
  }

  ngAfterViewInit(): void {
    this.lastElementRef.changes.subscribe(element => {
      if (element.last) {
        this.observer.observe(element.last.nativeElement)
      }
    })
    // this.observer.observe(this.lastElementRef.nativeElement);
  }  



  fetch = () => {
    if (this.albumID <= 10) {
      this.api.GetData(`https://jsonplaceholder.typicode.com/albums/${this.albumID}/photos`).toPromise().then(data => {
        this.photos = [...this.photos, ...data]
          this.albumID += 1;
      })
    }
  } 

  intersectionObserver() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.fetch()
      }
    }, {
      rootMargin: "100px"
    })
  }
  

  deletePhoto(id: number) {
    this.filterPhotoWithId(id);
  }

  filterPhotoWithId = (id: number) => {
    this.photos = this.photos.reduce((newPhotosArray:photoInterface[], photo: photoInterface) => {
      if (photo.id !== id) {
        newPhotosArray = [...newPhotosArray, photo]
      }   
      return newPhotosArray 
    }, [])
  }

}
