import { Component } from "@angular/core";  
  
@Component({  
     
    selector: 'my-App',  
  
      
    template: '<h1>Hi {{name}}</h1>'  
})  
  
export class AppComponent {  
    name: string = "Karthik"  
}

