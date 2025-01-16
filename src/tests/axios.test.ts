import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// import axios from "axios";
import api from "../utils/axios/instance";
import MockAdapter from "axios-mock-adapter";

describe("axios instance configuration and interceptors", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should have the correct baseURL and timeout", () => {
    expect(api.defaults.baseURL).toBe("https://apisyamresto.syamdev.my.id/api");
    expect(api.defaults.timeout).toBe(5000);
  });

  it("should invoke the request interceptor", async () => {
    const requestInterceptor = vi.fn((config) => config);
    api.interceptors.request.use(requestInterceptor); // Attach spy

    mock.onGet("/test").reply(200, { message: "success" });

    await api.get("/test");

    expect(requestInterceptor).toHaveBeenCalledOnce();
  });

  it("should invoke the response interceptor on success", async () => {
    const responseInterceptor = vi.fn((response) => response);
    api.interceptors.response.use(responseInterceptor); // Attach spy

    mock.onGet("/carousels").reply(200, { data: "mocked response" });

    const response = await api.get("/carousels");

    expect(responseInterceptor).toHaveBeenCalledOnce();
    expect(response.data).toEqual({ data: "mocked response" });
  });

  // it("should invoke the response interceptor on error", async () => {
  //   const errorInterceptor = vi.fn((error) => Promise.reject(error));
  //   api.interceptors.response.use(null, errorInterceptor); // Attach spy

  //   mock.onGet("/error").reply(500);

  //   try {
  //     await api.get("/error");
  //   } catch (error) {
  //     expect(errorInterceptor).toHaveBeenCalledOnce();
  //     expect(error).toBeInstanceOf(Error);
  //   }
  // });

  it("should invoke the response interceptor on error", async () => {
    const errorInterceptorSpy = vi.fn((error) => Promise.reject(error));

    // Replace the default error interceptor with a spy
    const interceptorId = api.interceptors.response.use(
      undefined,
      errorInterceptorSpy
    );

    mock.onGet("/error").reply(500); // Simulate server error

    try {
      await api.get("/error");
    } catch (error) {
      expect(errorInterceptorSpy).toHaveBeenCalledOnce();
      expect(error).toBeInstanceOf(Error);
    } finally {
      api.interceptors.response.eject(interceptorId); // Cleanup
    }
  });
});
