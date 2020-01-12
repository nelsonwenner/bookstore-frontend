import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Add imports */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgImageSliderModule } from 'ng-image-slider';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';

const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};

import * as MATERIAL_MODULES from '@angular/material';

import { SliderComponent } from './components/commons/slider/slider.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { MdePopoverModule } from '@material-extended/mde';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/book/books.component';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { Page404 } from './components/page404/page404.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';
import { MarketingComponent } from './components/widgets/marketing/marketing.component';
import { CartPopupComponent } from './components/carts/cart-popup/cart-popup.component';
import { CartComponent } from './components/carts/cart/cart.component';
import { QuantityControlComponent } from './components/carts/quantity-control/quantity-control.component';
import { EmptyCartComponent } from './components/carts/empty-cart/empty-cart.component';
import { CheckoutComponent } from './components/checkouts/checkout/checkout.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { ProfileInformationComponent } from './components/accounts/profile-information/profile-information.component';
import { ManageAddressComponent } from './components/accounts/manage-address/manage-address.component';
import { ManageCreditCardComponent } from './components/accounts/manage-credit-card/manage-credit-card.component';
import { OrdersComponent } from './components/accounts/orders/orders.component';
import { NgxUiLoaderModule} from 'ngx-ui-loader';
import { EmptyOrderComponent } from './components/accounts/empty-order/empty-order.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SliderComponent,
    HomeComponent,
    FooterComponent,
    BooksComponent,
    Page404,
    BookDetailComponent,
    MarketingComponent,
    CartPopupComponent,
    CartComponent,
    QuantityControlComponent,
    EmptyCartComponent,
    CheckoutComponent,
    AccountComponent,
    ProfileInformationComponent,
    ManageAddressComponent,
    ManageCreditCardComponent,
    OrdersComponent,
    EmptyOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),

    /* Material */
    MATERIAL_MODULES.MatAutocompleteModule,
    MATERIAL_MODULES.MatButtonModule,
    MATERIAL_MODULES.MatButtonToggleModule,
    MATERIAL_MODULES.MatCardModule,
    MATERIAL_MODULES.MatCheckboxModule,
    MATERIAL_MODULES.MatChipsModule,
    MATERIAL_MODULES.MatDatepickerModule,
    MATERIAL_MODULES.MatDialogModule,
    MATERIAL_MODULES.MatExpansionModule,
    MATERIAL_MODULES.MatGridListModule,
    MATERIAL_MODULES.MatIconModule,
    MATERIAL_MODULES.MatInputModule,
    MATERIAL_MODULES.MatListModule,
    MATERIAL_MODULES.MatMenuModule,
    MATERIAL_MODULES.MatProgressBarModule,
    MATERIAL_MODULES.MatProgressSpinnerModule,
    MATERIAL_MODULES.MatRadioModule,
    MATERIAL_MODULES.MatRippleModule,
    MATERIAL_MODULES.MatSelectModule,
    MATERIAL_MODULES.MatSidenavModule,
    MATERIAL_MODULES.MatSlideToggleModule,
    MATERIAL_MODULES.MatSliderModule,
    MATERIAL_MODULES.MatSnackBarModule,
    MATERIAL_MODULES.MatStepperModule,
    MATERIAL_MODULES.MatTableModule,
    MATERIAL_MODULES.MatTabsModule,
    MATERIAL_MODULES.MatToolbarModule,
    MATERIAL_MODULES.MatTooltipModule,
    MATERIAL_MODULES.MatNativeDateModule,
    MATERIAL_MODULES.MatTreeModule,
    OwlModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    NgxSkltnModule.forRoot(skltnConfig),
    MdePopoverModule
  ],
  providers: [

    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent]
})

export class AppModule { }
