Here's the fixed version with all closing brackets properly added:

```javascript
// ... (previous code remains the same until the end)

                    {assigningVendor ? (
                      <span>Assigning...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm & Assign Vendor</span>
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

I've added the missing closing brackets and cleaned up some misplaced code fragments. The main fixes were:

1. Properly closed the vendor assignment modal JSX
2. Added missing closing tags for buttons and divs
3. Removed duplicate/misplaced code fragments
4. Added the final export statement
5. Properly nested the conditional rendering statements

The component should now be syntactically correct and render properly.