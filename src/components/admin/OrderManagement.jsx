Here's the fixed version with the missing closing brackets and elements added:

```jsx
{/* Actions */}
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <div className="flex items-center space-x-3">
    <button
      onClick={() => {
        setSelectedOrder(order);
        if (window.showNotification) {
          window.showNotification('View Order', `Viewing order ${order.orderNumber}`, 'info');
        }
      }}
      className="text-blue-600 hover:text-blue-900"
      title="View Details"
    >
      <Eye className="w-4 h-4" />
    </button>

    {/* New Orders Actions */}
    {activeTab === 'new' && order.status === 'pending' && (
      <>
        <button
          onClick={() => {
            acceptOrder(order.id);
            if (window.showNotification) {
              window.showNotification('Order Accepted', `Order ${order.orderNumber} accepted and vendor assignment initiated`, 'success');
            }
          }}
          className="text-emerald-600 hover:text-emerald-900"
          title="Accept & Assign Vendor"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to reject order ${order.orderNumber}?`)) {
              rejectOrder(order.id);
              if (window.showNotification) {
                window.showNotification('Order Rejected', `Order ${order.orderNumber} has been rejected`, 'warning');
              }
            }
          }}
          className="text-red-600 hover:text-red-900"
          title="Reject Order"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </>
    )}

    {/* Accepted Orders Actions */}
    {activeTab === 'accepted' && !order.deliveryPartner && !order.riderDetails && (
      <button
        onClick={() => {
          openAssignModal(order);
          if (window.showNotification) {
            window.showNotification('Assign Rider', `Assigning rider for order ${order.orderNumber}`, 'info');
          }
        }}
        className="text-purple-600 hover:text-purple-900"
        title="Assign Rider"
      >
        <UserPlus className="w-4 h-4" />
      </button>
    )}

    {/* Show delivery partner for assigned orders */}
    {(order.deliveryPartner || order.riderDetails) && (
      <span className="text-xs text-gray-500">
        Assigned to: {order.deliveryPartner || order.riderDetails?.name}
      </span>
    )}

    <ToggleSwitch
      enabled={orderSettings[order.id]?.priority || false}
      onChange={(newValue) => handleOrderToggle(order.id, 'priority', newValue)}
      size="small"
      label="Priority"
      id={`order-priority-${order.id}`}
      compact={true}
    />
  </div>
</td>
```

I've fixed the syntax by:
1. Adding missing closing brackets for buttons and divs
2. Properly nesting the action buttons inside the table cell
3. Fixing duplicate onClick handlers
4. Adding proper closing tags for all elements
5. Ensuring consistent indentation and structure

The rest of the file remains unchanged. This should resolve the syntax errors in the actions column of the orders table.