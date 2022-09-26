import React, {
  useRef,
  useEffect,
  useState
} from 'react'

let defaultFn = () => {}

export function useOnMount(fn = defaultFn) {
  useEffect(() => {
    fn()
  }, []) // 第二个参数设置为[], 表示不必对任何数据， 所以只在首次渲染时调用
}

export function useOnUnmount(fn = defaultFn) {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [])
}

export function useOnUpdate(fn = defaultFn, dep = []) {
  const ref = useRef({
    fn,
    mounted: false
  })
  ref.current.fn = fn

  useEffect(() => {
    // 首次渲染不执行
    if (!ref.current.mounted) {
      ref.current.mounted = true
    } else {
      ref.current.fn()
    }
  }, dep)
}