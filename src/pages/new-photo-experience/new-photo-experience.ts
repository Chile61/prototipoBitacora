import { Component, NgZone, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SelectBitacoraComponent } from '../../components/select-bitacora/select-bitacora';
import { DataBitacorasPersonales } from '../../prototype_data/data_bitacoras_personales';
import { DataBitacorasCompartidas } from '../../prototype_data/data_bitacoras_compartidas';
import { BitacoraPersonalPage} from '../../pages/bitacora-personal/bitacora-personal';

/**
 * Generated class for the NewPhotoExperiencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-photo-experience',
  templateUrl: 'new-photo-experience.html',
})
export class NewPhotoExperiencePage {


    title: string;
    bitacora:string;
    fecha: string = new Date().toISOString();
    image: any = [];

    showHelp: boolean = true;
    TittleDummyText: string = "Dummy Tittle";
    descriptionDummyText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit massa. Etiam non bibendum sapien. Nam in nulla ex. Morbi egestas turpis et vestibulum tincidunt. Cras pulvinar facilisis dolor, in luctus turpis tincidunt in. Mauris dolor diam, molestie quis tincidunt quis, consequat ut nisl. Donec feugiat orci vel risus ullamcorper porttitor sed posuere libero. Donec egestas vel felis vel ullamcorper. Vestibulum efficitur elit ut elit vestibulum, quis ullamcorper lacus pretium.";

    backup_bitacoras_personales: any;
    backup_bitacoras_compartidas: any;
    backup_id: any;
    backup_type: string;



  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public zone: NgZone,
      public element:ElementRef,
      private dataPersonal: DataBitacorasPersonales,
      private dataCompartida: DataBitacorasCompartidas,
      public modalCtrl: ModalController) {
        this.bitacora = dataPersonal.getBitacoraTitles()[0];
        this.backup_id = dataPersonal.getBitacoras()[0].id;
        this.backup_type = "personal";
        this.backup_bitacoras_personales = dataPersonal.getBitacoras();
        this.backup_bitacoras_compartidas = dataCompartida.getBitacoras();
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPhotoExperiencePage');
  }


    selectModal(){
      let modal = this.modalCtrl.create(SelectBitacoraComponent, {id: this.backup_id, type: this.backup_type}, {showBackdrop:true, enableBackdropDismiss:true});
      modal.onDidDismiss(data => {
        data = data.split(/(\s+)/);
        var type = data[0];
        var id = parseInt(data[2],10);
        this.backup_id = id;
        this.backup_type = type;
        if (type == "personal"){
          for (let bitacora of this.backup_bitacoras_personales){
            if (bitacora.id != null && bitacora.id == id ){
              this.bitacora = bitacora.title;
              break;
            }
          }
        } else if (type == "compartida"){
          for (let bitacora of this.backup_bitacoras_compartidas){
            if (bitacora.id != null && bitacora.id == id ){
              this.bitacora = bitacora.title;
              break;
            }
          }
        }
      });
      modal.present();
    }

    imageClicked(){
      this.image = [{src: "assets/prototype/img10.png"}, {src: "assets/prototype/img11.png"}, {src: "assets/prototype/img12.png"}];

      console.log("imageclicked");
    }

    titleFocus(){
      if (this.title == null){
        var index = 0;
        this.zone.run(() => { var timer = setInterval(() => { index++; this.title = this.TittleDummyText.substring(0,index); if (index == this.TittleDummyText.length){clearInterval(timer);}},1)});
      }
    }

    publish(){
      var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      var datetime = new Date(this.fecha);
      var created_at = datetime.getDate() + " de " + months[datetime.getMonth()] + ", " + datetime.getFullYear();
      var data = { title: this.title, pics: this.image, created_at: created_at }
      if (this.backup_type == "personal"){
        this.dataPersonal.setTextEntry(this.backup_id, data);
        this.navCtrl.push(BitacoraPersonalPage, { data: this.dataPersonal.getBitacora(this.backup_id) });
      } else{
        this.dataCompartida.setTextEntry(this.backup_id, data);
        this.navCtrl.push(BitacoraPersonalPage, { data: this.dataCompartida.getBitacora(this.backup_id) });
      }
    }




}
