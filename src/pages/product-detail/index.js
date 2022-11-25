import queryString from "query-string";
import { setNavigationBar, setTitleNavigationBar } from "../../utils/common";
import { getDetailByProductId, getRelatedProduct } from "../../services";
import { navigateWithParams, reLaunch } from "../../utils/navigate";

Page({
  disposableCollection: [],

  data: {
    isLoading: true,
    isError: false,
    messageError: "",
    banner: [],
    product: {
      id: "",
      nameProduct: "",
      rating: 0,
      price: 0,
      priceOrigin: 0,
      packageTime: "",
      saleOff: 0,
      promotionId: "",
      appId: "",
    },
    details: [],
    toast: {
      isShow: false,
      content: "",
      showAt: "",
    },
    relatedProducts: [],
  },

  onReady() {
    setTitleNavigationBar();
  },

  onShow() {
    setNavigationBar();
  },

  onAddToCart() {
    getApp().addProduct(this.data.product);
    setNavigationBar();
    this.showToast("Thêm vào giỏ hàng thành công!");
  },

  onBuyNow() {
    getApp().chooseAllProduct(false);
    getApp().addProduct(this.data.product);
    navigateWithParams({
      page: "cart",
    });
  },

  onCustomIconEvent() {
    navigateWithParams({
      page: "cart",
    });
  },

  showToast(content) {
    this.setData({
      toast: {
        isShow: true,
        content,
        showAt: Date.now(),
      },
    });
  },

  hideToast() {
    this.setData({
      toast: {
        isShow: false,
        content: "",
        showAt: "",
      },
    });
  },

  async onLoad(query) {
    this.setData({
      isLoading: true,
    });
    try {
      const { productId } = queryString.parse(query);
      const [detailRes, relatedRes] = await Promise.all([
        getDetailByProductId(productId),
        getRelatedProduct(productId),
      ]);
      if (detailRes.status === "success") {
        this.setData({
          product: {
            id: detailRes.data.product_id,
            nameProduct: detailRes.data.product_name,
            rating: detailRes.data.rating,
            price: detailRes.data.price,
            priceOrigin: detailRes.data.price_origin,
            packageTime: detailRes.data.package_time,
            saleOff: detailRes.data.sale_off,
            image: detailRes.data.image,
            promotion: detailRes.data.promotion?.[0],
            appId: detailRes.data.app_id,
          },
          banner: detailRes.data.slide,
          details: detailRes.data.detail,
        });
      } else {
        this.setData({
          isError: true,
          messageError: detailRes.message,
        });
      }
      if (relatedRes.status === "success") {
        this.setData({
          relatedProducts: relatedRes.data,
        });
      }
    } catch {
      this.setData({
        isError: true,
      });
    } finally {
      this.setData({
        isLoading: false,
      });
    }
  },

  onTapHome() {
    reLaunch({
      page: "home",
    });
  },
});
