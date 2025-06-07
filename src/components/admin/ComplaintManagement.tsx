
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Send, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Complaint {
  id: string;
  order_id: string;
  customer_email: string;
  subject: string;
  complaint_details: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
  resolution_notes: string | null;
  resolved_at: string | null;
}

export const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({ title: "Failed to load complaints", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setResolutionNotes(complaint.resolution_notes || "");
    setEmailSubject(`Re: Your Order #${complaint.order_id.substring(0, 8)} - ${complaint.subject}`);
    setEmailBody(`Dear Customer,

Thank you for reaching out regarding your order #${complaint.order_id.substring(0, 8)}.

[Your response here]

We appreciate your business and apologize for any inconvenience caused.

Best regards,
Moftabo Cakes Team

---
This email is regarding Order #${complaint.order_id.substring(0, 8)}
Moftabo Cakes - Premium Custom Cakes
Contact: admin@moftabo.com`);
    setIsModalOpen(true);
  };

  const updateComplaintStatus = async (status: string) => {
    if (!selectedComplaint) return;

    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
        updateData.resolution_notes = resolutionNotes;
      }

      const { error } = await supabase
        .from('customer_complaints')
        .update(updateData)
        .eq('id', selectedComplaint.id);

      if (error) throw error;

      toast({ title: "Complaint status updated successfully" });
      fetchComplaints();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast({ title: "Failed to update complaint", variant: "destructive" });
    }
  };

  const sendEmail = () => {
    // Create mailto link with pre-filled content
    const mailtoLink = `mailto:${selectedComplaint?.customer_email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    
    toast({ title: "Email client opened with pre-filled response" });
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-red-100 text-red-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p>Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Customer Complaints Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No complaints found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">
                      {complaint.order_id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{complaint.customer_email}</TableCell>
                    <TableCell className="max-w-xs truncate">{complaint.subject}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(complaint.created_at)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComplaintClick(complaint)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Complaint Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-6">
              {/* Complaint Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium">{selectedComplaint.order_id.substring(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Customer Email</p>
                      <p className="font-medium">{selectedComplaint.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Priority</p>
                      <Badge className={getPriorityColor(selectedComplaint.priority)}>
                        {selectedComplaint.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className={getStatusColor(selectedComplaint.status)}>
                        {selectedComplaint.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Subject</p>
                    <p className="font-medium">{selectedComplaint.subject}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Complaint Details</p>
                    <p className="mt-1 p-3 bg-gray-50 rounded">{selectedComplaint.complaint_details}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Resolution Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Add resolution notes..."
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Email Response */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email Body</label>
                    <Textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={10}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={sendEmail} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Open in Email Client
                  </Button>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => updateComplaintStatus('in_progress')}
                  variant="outline"
                  className="flex-1"
                >
                  Mark In Progress
                </Button>
                <Button
                  onClick={() => updateComplaintStatus('resolved')}
                  className="flex-1"
                >
                  Mark Resolved
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
