import Layout from "../components/Layout";
import MyPageView from "../components/MyPageView";;

export default function PageView() {
  return (
    <Layout noLayout={true}>
    

    <div>
        {/* Page Content */}
        <MyPageView />
    </div>
       

        

       
      
    </Layout>
  );
}


// Static property to hide Header and Footer
PageView.noLayout = true;
