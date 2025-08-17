import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"

async function getSalesData() {
  try {
    const data = await db.order.aggregate({
      _sum: { pricePaidInCents: true },
      _count: true,
    })

    return {
      amount: (data._sum.pricePaidInCents || 0) / 100,
      numberOfSales: data._count,
    }
  } catch (error) {
    console.error("Error fetching sales data:", error)
    return {
      amount: 0,
      numberOfSales: 0,
    }
  }
}

async function getUserData() {
  try {
    const [userCount, orderData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaidInCents: true },
      }),
    ])

    return {
      userCount,
      averageValuePerUser:
        userCount === 0
          ? 0
          : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return {
      userCount: 0,
      averageValuePerUser: 0,
    }
  }
}

async function getProductData() {
  try {
    const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({ where: { isAvailableForPurchase: true } }),
      db.product.count({ where: { isAvailableForPurchase: false } }),
    ])

    return { activeCount, inactiveCount }
  } catch (error) {
    console.error("Error fetching product data:", error)
    return { activeCount: 0, inactiveCount: 0 }
  }
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ])

  return (
    <div className="space-y-6">
      {/* Database Connection Warning */}
      {salesData.numberOfSales === 0 && userData.userCount === 0 && productData.activeCount === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ Database Not Connected
          </h3>
          <p className="text-yellow-700 mb-4">
            Your database is not connected. Set up PlanetScale to start managing your store.
          </p>
          <div className="space-x-4">
            <a 
              href="https://planetscale.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Set up Database
            </a>
            <a 
              href="/admin/products" 
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Manage Products
            </a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Sales"
          subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
          body={formatCurrency(salesData.amount)}
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatCurrency(
            userData.averageValuePerUser
          )} Average Value`}
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
        />
      </div>
    </div>
  )
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
