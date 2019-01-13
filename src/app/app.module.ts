import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BitacoraPersonalPage } from "../pages/bitacora-personal/bitacora-personal";


import { NewTextExperiencePage } from "../pages/new-text-experience/new-text-experience";




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../test/globalprovider';
import { ComponentsModule } from '../components/components.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DataBitacorasPersonales } from '../prototype_data/data_bitacoras_personales';
import { ImageSliderViewerComponent } from '../components/image-slider-viewer/image-slider-viewer';
import { NewTabComponent } from '../components/new-tab/new-tab';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BitacoraPersonalPage,
    NewTextExperiencePage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BitacoraPersonalPage,
    NewTextExperiencePage,
    ImageSliderViewerComponent,
    NewTabComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalProvider,
    DataBitacorasPersonales,
    PhotoViewer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
