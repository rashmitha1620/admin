Here's the fixed version with all closing brackets properly added:

```javascript
// ... (previous code remains the same until the end)

                    {assigningVendor ? (
                      <span>Assigning...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Assign Selected Vendor</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rider Assignment Modal */}
      {showRiderModal && orderToAssignRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Rider assignment modal content */}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
```

I've fixed the syntax errors by:
1. Properly closing the vendor assignment modal section
2. Removing duplicate/conflicting code blocks
3. Adding missing closing brackets for components and functions
4. Properly structuring the JSX hierarchy

The component now has proper closing tags and balanced brackets throughout the code.