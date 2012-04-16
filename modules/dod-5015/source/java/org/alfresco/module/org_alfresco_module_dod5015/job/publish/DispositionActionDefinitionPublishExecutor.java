/*
 * Copyright (C) 2009-2011 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
package org.alfresco.module.org_alfresco_module_dod5015.job.publish;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.module.org_alfresco_module_dod5015.action.RecordsManagementActionService;
import org.alfresco.module.org_alfresco_module_dod5015.action.impl.BroadcastDispositionActionDefinitionUpdateAction;
import org.alfresco.module.org_alfresco_module_dod5015.model.RecordsManagementModel;
import org.alfresco.repo.policy.BehaviourFilter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;

/**
 * Disposition action definition publish executor
 * 
 * @author Roy Wetherall
 */
public class DispositionActionDefinitionPublishExecutor extends BasePublishExecutor
{
    /** Node service */
    private NodeService nodeService;
    
    /** Records management action service */
    private RecordsManagementActionService rmActionService;

    /** Behaviour filter */
    @SuppressWarnings("unused")
    private BehaviourFilter behaviourFilter;
    
    /**
     * Set node service
     * @param nodeService   node service
     */
    public void setNodeService(NodeService nodeService)
    {
        this.nodeService = nodeService;
    }
    
    /**
     * Set records management service
     * @param rmActionService   records management service
     */
    public void setRmActionService(RecordsManagementActionService rmActionService)
    {
        this.rmActionService = rmActionService;
    }
    
    /**
     * Set behaviour filter
     * @param behaviourFilter   behaviour filter
     */
    public void setBehaviourFilter(BehaviourFilter behaviourFilter)
    {
        this.behaviourFilter = behaviourFilter;
    }
    
    /**
     * @see org.alfresco.module.org_alfresco_module_dod5015.job.publish.PublishExecutor#getName()
     */
    @Override
    public String getName()
    {
        return RecordsManagementModel.UPDATE_TO_DISPOSITION_ACTION_DEFINITION;
    }

    /**
     * @see org.alfresco.module.org_alfresco_module_dod5015.job.publish.PublishExecutor#publish(org.alfresco.service.cmr.repository.NodeRef)
     */
    @SuppressWarnings("unchecked")
    @Override
    public void publish(NodeRef nodeRef)
    {
        List<QName> updatedProps = (List<QName>)nodeService.getProperty(nodeRef, RecordsManagementModel.PROP_UPDATED_PROPERTIES);
        if (updatedProps != null)
        {
            Map<String, Serializable> params = new HashMap<String, Serializable>();
            params.put(BroadcastDispositionActionDefinitionUpdateAction.CHANGED_PROPERTIES, (Serializable)updatedProps);
            rmActionService.executeRecordsManagementAction(nodeRef, BroadcastDispositionActionDefinitionUpdateAction.NAME, params);            
        }
    }
}