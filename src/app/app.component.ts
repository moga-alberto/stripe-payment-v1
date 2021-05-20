import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe-payment-v1';
  paymentHandler: any = null;

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.invokeStripe();

  }

  makePayment(value: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IsrYKKvlEtRprkGJnx7tHbrwn0mHX75V8dXkMEhKOJflCNb2XjJLiWnvYzgkOfa7v5ejN20XlKrq8pPyGQhPsR900aSIhSBfG',
      locale: 'auto',
      token: function(stripeToken: any) {
        console.log(stripeToken.card);
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Test name',
      description: '1 product added',
      amount: value * 100,
    })
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }
}

