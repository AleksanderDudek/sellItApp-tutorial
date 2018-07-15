package com.sellitapp;

//react-native-navigation requirement
import com.reactnativenavigation.controllers.SplashActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;
import android.util.TypedValue;
import android.widget.TextView;



 public class MainActivity extends SplashActivity {

     @Override
     public LinearLayout createSplashLayout(){
         LinearLayout view = new LinearLayout(this);
         TextView text = new TextView(this);

         view.setBackgroundColor(Color.parseColor("#00ADA9"));
         view.setGravity(Gravity.CENTER);

         text.setText("Sell it");
         text.setTextColor(Color.parseColor("#ffffff"));
         text.setGravity(Gravity.CENTER);
         text.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 60);

         view.addView(text);

         return view;
     }
 }


// old soluton
// import com.facebook.react.ReactActivity;

// public class MainActivity extends ReactActivity {

//     /**
//      * Returns the name of the main component registered from JavaScript.
//      * This is used to schedule rendering of the component.
//      */
//     @Override
//     protected String getMainComponentName() {
//         return "sellItApp";
//     }
// }
