import React from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Filter, MoreHorizontal, Edit, Trash2, Download, Eye, Upload } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PressKitPage() {
  // Mock data for press kit assets
  const pressAssets = [
    {
      id: 1,
      name: 'Company Logo (Primary)',
      type: 'Logo',
      format: 'SVG, PNG, JPG',
      size: '2.4 MB',
      downloads: 128,
      lastUpdated: '2023-06-10',
      status: 'active',
    },
    {
      id: 2,
      name: 'Company Logo (White)',
      type: 'Logo',
      format: 'SVG, PNG, JPG',
      size: '2.1 MB',
      downloads: 95,
      lastUpdated: '2023-06-10',
      status: 'active',
    },
    {
      id: 3,
      name: 'Brand Guidelines',
      type: 'Document',
      format: 'PDF',
      size: '5.8 MB',
      downloads: 76,
      lastUpdated: '2023-05-22',
      status: 'active',
    },
    {
      id: 4,
      name: 'Product Screenshots',
      type: 'Images',
      format: 'PNG, JPG',
      size: '12.5 MB',
      downloads: 64,
      lastUpdated: '2023-06-05',
      status: 'active',
    },
    {
      id: 5,
      name: 'Company Fact Sheet',
      type: 'Document',
      format: 'PDF, DOCX',
      size: '1.2 MB',
      downloads: 112,
      lastUpdated: '2023-06-01',
      status: 'active',
    },
    {
      id: 6,
      name: 'Executive Headshots',
      type: 'Images',
      format: 'JPG',
      size: '8.7 MB',
      downloads: 43,
      lastUpdated: '2023-06-08',
      status: 'active',
    },
    {
      id: 7,
      name: 'Office Photos',
      type: 'Images',
      format: 'JPG',
      size: '15.3 MB',
      downloads: 29,
      lastUpdated: '2023-05-15',
      status: 'inactive',
    },
  ];

  // Mock data for press releases
  const pressReleases = [
    {
      id: 1,
      title: 'Company Announces New Product Launch',
      date: '2023-06-15',
      author: 'Marketing Team',
      status: 'published',
      views: 1245,
    },
    {
      id: 2,
      title: 'Company Secures $10M in Series A Funding',
      date: '2023-05-22',
      author: 'PR Department',
      status: 'published',
      views: 2876,
    },
    {
      id: 3,
      title: 'Company Expands to European Market',
      date: '2023-04-10',
      author: 'PR Department',
      status: 'published',
      views: 1532,
    },
    {
      id: 4,
      title: 'Company Announces Strategic Partnership',
      date: '2023-03-28',
      author: 'Marketing Team',
      status: 'published',
      views: 987,
    },
    {
      id: 5,
      title: 'Company Wins Industry Award',
      date: '2023-07-01',
      author: 'PR Department',
      status: 'draft',
      views: 0,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>;
      case 'published':
        return <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Press Kit Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Assets
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Press Release
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assets">
        <TabsList className="mb-4">
          <TabsTrigger value="assets">Media Assets</TabsTrigger>
          <TabsTrigger value="releases">Press Releases</TabsTrigger>
          <TabsTrigger value="contacts">Media Contacts</TabsTrigger>
          <TabsTrigger value="analytics">Download Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Media Assets</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage logos, brand guidelines, and other downloadable assets
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <Input
                    placeholder="Search assets..."
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
                        Type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>All</DropdownMenuItem>
                      <DropdownMenuItem>Logo</DropdownMenuItem>
                      <DropdownMenuItem>Document</DropdownMenuItem>
                      <DropdownMenuItem>Images</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pressAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>{asset.format}</TableCell>
                        <TableCell>{asset.size}</TableCell>
                        <TableCell>{asset.downloads}</TableCell>
                        <TableCell>{asset.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(asset.status)}</TableCell>
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
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
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
        </TabsContent>

        <TabsContent value="releases">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Press Releases</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage company announcements and news
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <Input
                    placeholder="Search press releases..."
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
                      <DropdownMenuItem>Published</DropdownMenuItem>
                      <DropdownMenuItem>Draft</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pressReleases.map((release) => (
                      <TableRow key={release.id}>
                        <TableCell className="font-medium">{release.title}</TableCell>
                        <TableCell>{release.date}</TableCell>
                        <TableCell>{release.author}</TableCell>
                        <TableCell>{getStatusBadge(release.status)}</TableCell>
                        <TableCell>{release.views}</TableCell>
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
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Media Contacts</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage press contacts and media relations
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="border p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Primary Press Contact</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex">
                      <span className="font-medium w-32">Name:</span>
                      <span>Sarah Johnson</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Title:</span>
                      <span>PR Director</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Email:</span>
                      <span>press@company.com</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Phone:</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Contact
                  </Button>
                </div>

                <div className="border p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Media Inquiry Form</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure the media inquiry form settings
                  </p>
                  <div className="mt-4 flex gap-4">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Form
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Form
                    </Button>
                  </div>
                </div>

                <div className="border p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Press Email Templates</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage email templates for press communications
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Templates
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Download Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track press kit downloads and usage
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">547</div>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Most Downloaded</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium">Company Logo (Primary)</div>
                    <p className="text-xs text-muted-foreground mt-1">128 downloads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Press Release Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">6,640</div>
                    <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-4">Download Trends (Last 30 Days)</h3>
                <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-4">Top Referrers</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Downloads</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Direct</TableCell>
                        <TableCell>215</TableCell>
                        <TableCell>39.3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>company.com</TableCell>
                        <TableCell>142</TableCell>
                        <TableCell>26.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>techcrunch.com</TableCell>
                        <TableCell>87</TableCell>
                        <TableCell>15.9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>linkedin.com</TableCell>
                        <TableCell>64</TableCell>
                        <TableCell>11.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other</TableCell>
                        <TableCell>39</TableCell>
                        <TableCell>7.1%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
