import * as React from 'react'

/**
 * Hook to automatically handle horizontal scrolling for a tab list.
 * Uses MutationObserver to detect when a tab becomes active or when new tabs are added,
 * ensuring the active tab is always visible without manual useEffect synchronization in the component.
 */
export function useTabsScroll() {
  const containerRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollIntoView = (element: Element) => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }

    // Scroll to initially active tab
    const initialActive = container.querySelector('[data-state="active"]')
    if (initialActive) scrollIntoView(initialActive)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Handle tab selection (attribute change)
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-state'
        ) {
          const target = mutation.target as HTMLElement
          if (target.getAttribute('data-state') === 'active') {
            scrollIntoView(target)
          }
        }

        // Handle new tabs added (childList change)
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const activeChild = node.getAttribute('data-state') === 'active' 
                ? node 
                : node.querySelector('[data-state="active"]')
              
              if (activeChild) {
                scrollIntoView(activeChild)
              }
            }
          })
        }
      }
    })

    observer.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['data-state'],
    })

    return () => observer.disconnect()
  }, []) // Empty deps ensures this logic is decoupled from React render cycles

  return containerRef
}
