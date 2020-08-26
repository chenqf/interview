import { expect } from "chai";

import { shallowMount } from "@vue/test-utils";

import { mount } from "@vue/test-utils";
import Com from "@/components/test_demo/c1.vue";

describe("test_demo/c1.vue", () => {
  it("button click should increment the num", () => {
    const wrapper = shallowMount(Com);
    const vm = wrapper.vm;
    expect(wrapper.vm.mum).to(0);
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.mum).to(1);
  });
});
