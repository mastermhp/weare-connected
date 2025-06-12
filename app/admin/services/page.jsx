import React from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ServicesPage() {
  // Mock data for services
  const services = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Custom website development with modern technologies',
      category: 'Development',
      pricing: 'From $5,000',
      status: 'active',
      features: 12,
      testimonials: 8,
      lastUpdated: '2023-06-10',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      category: 'Development',
      pricing: 'From $8,000',
      status: 'active',
      features: 15,
      testimonials: 6,
      lastUpdated: '2023-05-22',
    },
    {
      id: 3,
      name: 'UI/UX Design',
      description: 'User-centered design solutions for digital products',
      category: 'Design',
      pricing: 'From $3,500',
      status: 'active',
      features: 10,
      testimonials: 12,
      lastUpdated: '2023-06-05',
    },
    {
      id: 4,
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies',
      category: 'Marketing',
      pricing: 'From $2,500/month',
      status: 'active',
      features: 8,
      testimonials: 9,
      lastUpdated: '2023-06-01',
    },
    {
      id: 5,
      name: 'E-commerce Solutions',
      description: 'Custom online store development and optimization',
      category: 'Development',
      pricing: 'From $7,500',
      status: 'draft',
      features: 14,
      testimonials: 0,
      lastUpdated: '2023-06-08',
    },
    {
      id: 6,
      name: 'Content Creation',
      description: 'Professional content writing and strategy',
      category: 'Marketing',
      pricing: 'From $1,500/month',
      status: 'inactive',
      features: 6,
      testimonials: 3,
      lastUpdated: '2023-04-15',
    },
    {
      id: 7,
      name: 'SEO Optimization',
      description: 'Search engine optimization for better visibility',
      category: 'Marketing',
      pricing: 'From $2,000/month',
      status: 'active',
      features: 9,
      testimonials: 7,
      lastUpdated: '2023-05-28',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Draft</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Services Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Service Overview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your service offerings, pricing, and features
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Input
                placeholder="Search services..."
                className="max-w-sm"
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Active</DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuItem>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Testimonials</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{service.name}</div>
                        <div className="text-xs text-muted-foreground">{service.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.pricing}</TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>{service.features}</TableCell>
                    <TableCell>{service.testimonials}</TableCell>
                    <TableCell>{service.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Development</span>
                <Badge>3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Design</span>
                <Badge>1</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <Badge>3</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Categories
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total Features</span>
                <span className="font-bold">74</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Most Featured Service</span>
                <span>Mobile App Development</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Features
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total Testimonials</span>
                <span className="font-bold">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Most Reviewed Service</span>
                <span>UI/UX Design</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Testimonials
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
