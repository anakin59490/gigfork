/*
 * Copyright (C) 2005-2011 Alfresco Software Limited.
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
package org.alfresco.service.cmr.repository;

import java.util.HashMap;
import java.util.Map;

import org.alfresco.util.EqualsHelper;

/**
 * Represents maximum source values (that result in exceptions if exceeded) or
 * limits on source values (that result in EOF (End Of File) being returned
 * early). Options exist for elapse time, KBytes read or number of pages read.
 * 
 * @author Alan Davis
 */
public class TransformationOptionLimits
{
    public static final String OPT_TIMEOUT_MS = "timeoutMs";
    public static final String OPT_READ_LIMIT_TIME_MS = "readLimitTimeMs";
    
    public static final String OPT_MAX_SOURCE_SIZE_K_BYTES = "maxSourceSizeKBytes";
    public static final String OPT_READ_LIMIT_K_BYTES = "readLimitKBytes";
    
    public static final String OPT_MAX_PAGES = "maxPages";
    public static final String OPT_PAGE_LIMIT = "pageLimit";
    
    public static final String TIME_MESSAGE = "Both timeoutMs and readLimitTimeMs should not be set.";
    public static final String KBYTES_MESSAGE = "Both maxSourceSizeKBytes and readLimitKBytes should not be set.";
    public static final String PAGES_MESSAGE = "Both maxPages and pageLimit should not be set.";
    
    private TransformationOptionPair time = new TransformationOptionPair();
    private TransformationOptionPair kbytes = new TransformationOptionPair();
    private TransformationOptionPair pages = new TransformationOptionPair();

    public TransformationOptionLimits()
    {
        time = new TransformationOptionPair();
        kbytes = new TransformationOptionPair();
        pages = new TransformationOptionPair();
    }
    
    private TransformationOptionLimits(TransformationOptionLimits a, TransformationOptionLimits b)
    {
        time = a.time.combine(b.time);
        kbytes = a.kbytes.combine(b.kbytes);
        pages = a.pages.combine(b.pages);
    }
    
    // --------------- Time ---------------
    public TransformationOptionPair getTimePair()
    {
        return time;
    }

    public long getTimeoutMs()
    {
        return time.getMax();
    }

    public void setTimeoutMs(long timeoutMs)
    {
        time.setMax(timeoutMs, TIME_MESSAGE);
    }

    public long getReadLimitTimeMs()
    {
        return time.getLimit();
    }

    public void setReadLimitTimeMs(long readLimitTimeMs)
    {
        time.setLimit(readLimitTimeMs, TIME_MESSAGE);
    }
    
    // --------------- KBytes ---------------
    public TransformationOptionPair getKBytesPair()
    {
        return kbytes;
    }

    public long getMaxSourceSizeKBytes()
    {
        return kbytes.getMax();
    }

    public void setMaxSourceSizeKBytes(long maxSourceSizeKBytes)
    {
        kbytes.setMax(maxSourceSizeKBytes, KBYTES_MESSAGE);
    }

    public long getReadLimitKBytes()
    {
        return kbytes.getLimit();
    }

    public void setReadLimitKBytes(long readLimitKBytes)
    {
        kbytes.setLimit(readLimitKBytes, KBYTES_MESSAGE);
    }
    
    // --------------- Pages ---------------
    public TransformationOptionPair getPagesPair()
    {
        return pages;
    }

    public int getMaxPages()
    {
        return (int)pages.getMax();
    }

    public void setMaxPages(int maxPages)
    {
        pages.setMax(maxPages, PAGES_MESSAGE);
    }

    public int getPageLimit()
    {
        return (int)pages.getLimit();
    }

    public void setPageLimit(int pageLimit)
    {
        pages.setLimit(pageLimit, PAGES_MESSAGE);
    }
    
    // --------------- Map ---------------
    public Map<String, Object> toMap(Map<String, Object> optionsMap)
    {
        time.toMap(optionsMap, OPT_TIMEOUT_MS, OPT_READ_LIMIT_TIME_MS);
        kbytes.toMap(optionsMap, OPT_MAX_SOURCE_SIZE_K_BYTES, OPT_READ_LIMIT_K_BYTES);
        pages.toMap(optionsMap, OPT_MAX_PAGES, OPT_PAGE_LIMIT);
        return optionsMap;
    }
    
    public static Map<String, Object> removeFromMap(Map<String, Object> optionsMap)
    {
        optionsMap.remove(OPT_TIMEOUT_MS);
        optionsMap.remove(OPT_READ_LIMIT_TIME_MS);
        optionsMap.remove(OPT_MAX_SOURCE_SIZE_K_BYTES);
        optionsMap.remove(OPT_READ_LIMIT_K_BYTES);
        optionsMap.remove(OPT_MAX_PAGES);
        optionsMap.remove(OPT_PAGE_LIMIT);
        return optionsMap;
    }

    public void set(Map<String, Object> optionsMap)
    {
        time.set(optionsMap, OPT_TIMEOUT_MS, OPT_READ_LIMIT_TIME_MS, TIME_MESSAGE);
        kbytes.set(optionsMap, OPT_MAX_SOURCE_SIZE_K_BYTES, OPT_READ_LIMIT_K_BYTES, KBYTES_MESSAGE);
        pages.set(optionsMap, OPT_MAX_PAGES, OPT_PAGE_LIMIT, PAGES_MESSAGE);
    }
    
    public String toString()
    {
        return toMap(new HashMap<String, Object>()).toString();
    }

    /**
     * Returns a TransformationOptionLimits that has getter methods that combine the
     * the values from the getter methods of this and the supplied TransformationOptionLimits.
     */
    public TransformationOptionLimits combine(final TransformationOptionLimits that)
    {
        return new TransformationOptionLimits(this, that)
        {
            @Override
            public void setTimeoutMs(long timeoutMs)
            {
                throw new UnsupportedOperationException();
            }

            @Override
            public void setReadLimitTimeMs(long readLimitTimeMs)
            {
                throw new UnsupportedOperationException();
            }

            @Override
            public void setMaxSourceSizeKBytes(long maxSourceSizeKBytes)
            {
                throw new UnsupportedOperationException();
            }

            @Override
            public void setReadLimitKBytes(long readLimitKBytes)
            {
                throw new UnsupportedOperationException();
            }
            
            @Override
            public void setMaxPages(int maxPages)
            {
                throw new UnsupportedOperationException();
            }

            @Override
            public void setPageLimit(int pageLimit)
            {
                throw new UnsupportedOperationException();
            }
            
            @Override
            public void set(Map<String, Object> optionsMap)
            {
                throw new UnsupportedOperationException();
            }
        };
    }

    @Override
    public int hashCode()
    {
        int hashCode = 37 * time.hashCode();
        hashCode += 37 * kbytes.hashCode();
        hashCode += 37 * pages.hashCode();
        return hashCode;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        else if (obj instanceof TransformationOptionLimits)
        {
            TransformationOptionLimits that = (TransformationOptionLimits) obj;
            return
                EqualsHelper.nullSafeEquals(time, that.time) &&
                EqualsHelper.nullSafeEquals(kbytes, that.kbytes) &&
                EqualsHelper.nullSafeEquals(pages, that.pages);
        }
        else
        {
            return false;
        }
    }
}
