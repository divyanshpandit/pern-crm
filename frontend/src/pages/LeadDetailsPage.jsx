import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getLead, deleteLead, reset as resetLead } from '../features/leads/leadSlice';
import { getActivitiesForLead, createActivity, reset as resetActivities } from '../features/activities/activitySlice';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function LeadDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lead, isLoading: isLeadLoading, isError: isLeadError, message: leadMessage } = useSelector(
    (state) => state.leads
  );
  const { activities, isLoading: areActivitiesLoading, isError: areActivitiesError, message: activitiesMessage } = useSelector(
    (state) => state.activities
  );

  const [activityContent, setActivityContent] = useState('');
  const [activityType, setActivityType] = useState('note');
  const [scheduledAt, setScheduledAt] = useState(moment());

  useEffect(() => {
    dispatch(getLead(id));
    dispatch(getActivitiesForLead(id));

    return () => {
      dispatch(resetLead());
      dispatch(resetActivities());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteLead(id));
    navigate('/leads');
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    const activityData = {
      content: activityContent,
      type: activityType,
      lead_id: id,
    };

    if (activityType === 'call' || activityType === 'meeting') {
      activityData.scheduled_at = scheduledAt.toISOString();
    }

    dispatch(createActivity(activityData));
    setActivityContent('');
    setScheduledAt(moment()); // Reset datetime picker
  };

  if (isLeadLoading || areActivitiesLoading || !lead) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lead Details
        </Typography>
        {isLeadError && <Alert severity="error">{leadMessage}</Alert>}
        <Card>
          <CardContent>
            <Typography variant="h6">Name: {lead.name}</Typography>
            <Typography>Email: {lead.email}</Typography>
            <Typography>Phone: {lead.phone}</Typography>
            <Typography>Status: {lead.status}</Typography>
            <Typography>Owner: {lead.owner?.name}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/leads/edit/${id}`)}
            >
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add Activity
          </Typography>
          <Box component="form" onSubmit={handleAddActivity} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={activityType}
                label="Type"
                onChange={(e) => setActivityType(e.target.value)}
              >
                <MenuItem value="note">Note</MenuItem>
                <MenuItem value="call">Call</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Activity"
              variant="outlined"
              fullWidth
              value={activityContent}
              onChange={(e) => setActivityContent(e.target.value)}
            />
            {(activityType === 'call' || activityType === 'meeting') && (
              <Datetime
                value={scheduledAt}
                onChange={(val) => setScheduledAt(val)}
                inputProps={{ placeholder: 'Select Date & Time' }}
              />
            )}
            <Button type="submit" variant="contained">Add</Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Activity Timeline
          </Typography>
          {areActivitiesError && <Alert severity="error">{activitiesMessage}</Alert>}
          <List>
            {activities.map((activity) => (
              <ListItem key={activity.id}>
                <ListItemText
                  primary={activity.content}
                  secondary={`${new Date(activity.createdAt).toLocaleString()} - Type: ${activity.type} ${activity.scheduled_at ? `(Scheduled: ${new Date(activity.scheduled_at).toLocaleString()})` : ''}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default LeadDetailsPage;
