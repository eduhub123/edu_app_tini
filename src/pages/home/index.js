import {
  getBannersAPI,
  getPackages,
  getMonkeyStory,
} from "../../services/index";
import { products } from "../../constants/home";
import { navigateWithParams } from "../../utils/navigate";
import { setNavigationBar, setTitleNavigationBar } from "../../utils/common";

Page({
  data: {
    isLoading: true,
    banners: [],
    chooseAppId: "",
    products: products,
    packages: {},
    monkeyStoryContent: {},
    isError: false,
    messageError: "",
  },

  onReady() {
    this.loadData();
    setTitleNavigationBar();
    setNavigationBar();
    my.hideBackHome({ hide: true });
  },

  onShow() {
    setNavigationBar();
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });
    try {
      const [bannerRes, packagesRes, storyRes] = await Promise.all([
        getBannersAPI(),
        getPackages(),
        getMonkeyStory(),
      ]);

      if (packagesRes.status === "success") {
        this.setData({
          banners: bannerRes.data ?? [],
          packages: packagesRes.data,
          monkeyStoryContent: storyRes.data ?? {},
        });
      } else {
        this.setData({
          isError: true,
          messageError: packagesRes.message,
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

  onChangeAppId(appId) {
    this.setData({
      chooseAppId: appId !== this.data.chooseAppId ? appId : "",
    });
  },

  goToProductDetail(productId) {
    navigateWithParams({
      page: "product-detail",
      params: { productId: productId },
    });
  },

  onCustomIconEvent() {
    navigateWithParams({
      page: "cart",
    });
  },
});
