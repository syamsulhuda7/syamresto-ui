import { describe, it, expect, vi, beforeEach } from "vitest";
import { cartItemsStorage } from "../utils/zustand/cartItems";
import * as cookieUtils from "../utils/cookies/instance";

// Mocking getCookie and setCookie
vi.mock("../utils/cookies/instance");

describe("cartItemsStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cartItemsStorage.setState({ cartItems: [] }); // Reset the cartItems state before each test
  });

  it("should initialize cartItems from cookies after setting them", () => {
    const mockCartItems = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
        image_url: "img.webp",
      },
    ];

    cartItemsStorage.getState().addCartItems(mockCartItems[0]);
    const store = cartItemsStorage.getState();

    expect(store.cartItems).toEqual(mockCartItems);
  });

  it("should add a new cart item", () => {
    const newCartItem = {
      id: 2,
      name: "Product 2",
      price: 150,
      quantity: 1,
      image_url: "img.webp",
    };

    const store = cartItemsStorage.getState();
    store.addCartItems(newCartItem);
    const updatedStore = cartItemsStorage.getState();

    expect(store.cartItems).toHaveLength(0);
    expect(updatedStore.cartItems).toHaveLength(1);
    expect(updatedStore.cartItems[0]).toEqual(newCartItem);
    expect(cookieUtils.setCookie).toHaveBeenCalledWith(
      "cartItems",
      JSON.stringify([newCartItem]),
      1
    );
  });

  it("should increase the quantity of an existing cart item", () => {
    const existingCartItem = {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      image_url: "img.webp",
    };

    const expectedUpdatedCartItem = {
      ...existingCartItem,
      quantity: 4, // Kuantitas yang diharapkan
    };

    // Initialize store
    const store = cartItemsStorage.getState();

    // Add the cart item to increase its quantity
    store.addCartItems({ ...existingCartItem, quantity: 3 }); // Total quantity should be 4

    // Add again to ensure quantity is increased
    store.addCartItems({ ...existingCartItem, quantity: 1 }); // Total quantity should be 4

    // Get the updated store state
    const updatedStore = cartItemsStorage.getState();

    // Verify that the quantity has been updated to 4
    expect(updatedStore.cartItems[0].quantity).toBe(4);

    // Verify that setCookie was called with the correct updated cartItems
    expect(cookieUtils.setCookie).toHaveBeenCalledWith(
      "cartItems",
      JSON.stringify([expectedUpdatedCartItem]),
      1
    );
  });

  it("should reduce the quantity of an existing cart item", () => {
    const existingCartItem = {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      image_url: "img.webp",
    };

    // Get the current store state
    const store = cartItemsStorage.getState();
    store.addCartItems(existingCartItem);

    // Call reduceCartItems to reduce the quantity
    store.reduceCartItems(1);

    const updatedStore = cartItemsStorage.getState();

    expect(cookieUtils.setCookie).toHaveBeenCalledTimes(2);

    expect(cookieUtils.setCookie).toHaveBeenCalledWith(
      "cartItems",
      JSON.stringify([
        { ...existingCartItem, quantity: 1, image_url: "img.webp" },
      ]),
      1
    );
    // Verify that the quantity has been reduced to 1
    expect(updatedStore.cartItems[0].quantity).toBe(1);
  });

  it("should remove the cart item if quantity reaches zero", () => {
    const existingCartItem = {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      image_url: "img.webp",
    };

    // Get the current store state
    const store = cartItemsStorage.getState();

    // Call reduceCartItems to reduce the quantity to zero
    store.addCartItems(existingCartItem);
    store.reduceCartItems(1);

    // Verify that the cart item is removed
    expect(store.cartItems).toHaveLength(0);

    // Verify that setCookie was called with an empty array
    expect(cookieUtils.setCookie).toHaveBeenCalledWith(
      "cartItems",
      JSON.stringify([]),
      1
    );
  });

  it("should not change cartItems if the item id does not exist", () => {
    const nonExistingCartItemId = 999; // ID that does not exist
    const existingCartItem = {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      image_url: "img.webp",
    };

    // Initialize store
    const store = cartItemsStorage.getState();

    // Call reduceCartItems with an id that does not exist
    store.addCartItems(existingCartItem);
    store.reduceCartItems(nonExistingCartItemId);

    // Get the updated store state
    const updatedStore = cartItemsStorage.getState();

    // Verify that cartItems did not change
    expect(updatedStore.cartItems).toEqual([existingCartItem]);

    // Verify that setCookie was not called
    expect(cookieUtils.setCookie).toHaveBeenCalledTimes(1);
  });
});
